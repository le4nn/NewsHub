import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../app/navigation/types';
import { Article, fetchTopHeadlines } from '../shared/api/newsApi/client';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthedWeb'>;

export function AuthedWebScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const next = await fetchTopHeadlines();
      setArticles(next);
    } catch (e: any) {
      setError(e?.message ?? 'Ошибка сети');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Text style={styles.link} onPress={load}>
          Повторить
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={articles}
      keyExtractor={(item, idx) => `${item.url}-${idx}`}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('DetailWeb', { url: item.url, title: item.source?.name ?? 'News' })}
        >
          <Text style={styles.title}>{item.title}</Text>
          {!!item.description && <Text style={styles.desc}>{item.description}</Text>}
          <Text style={styles.meta}>
            {item.source?.name ?? 'Unknown source'}
            {item.publishedAt ? ` • ${new Date(item.publishedAt).toLocaleString()}` : ''}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  error: { color: '#b00020', fontSize: 16, marginBottom: 8, textAlign: 'center' },
  link: { color: '#1b73e8', fontSize: 16 },
  list: { padding: 12 },
  card: { padding: 12, borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  desc: { fontSize: 14, color: '#444', marginBottom: 8 },
  meta: { fontSize: 12, color: '#666' },
});
